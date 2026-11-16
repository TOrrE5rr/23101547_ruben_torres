
var lab02 = (() => {
  const comercial = () => db.getSiblingDB("comercial");
  const auditoria = () => db.getSiblingDB("auditoria").instantaneas_privilegios;
  let inicioFiltro = null;
  let idAntes = null;
  let idDespues = null;
  let rolAgregado = false;
  const salida = x => { printjson(x); return x; };
  function exigir(usuario, base) {
    const r = db.runCommand({connectionStatus: 1});
    if (r.ok !== 1) throw new Error(r.errmsg || "No se pudo comprobar la identidad");
    const usuarios = r.authInfo.authenticatedUsers;
    if (!usuarios.some(u => u.user === usuario && u.db === base)) {
      throw new Error("Abrir el shell de la conexion " + usuario + "@" + base);
    }
  }
  function dba() { exigir("admin", "admin"); }
  function app() { exigir("app_ventas", "comercial"); }
  function lineasLog() {
    dba();
    const r = db.adminCommand({getLog: "global"});
    if (r.ok !== 1 || !Array.isArray(r.log)) throw new Error(r.errmsg || "Error de getLog");
    return r.log;
  }
  function bitacora() {
    return lineasLog().map(linea => {
      try { return JSON.parse(linea); }
      catch (_) { return {texto: linea}; }
    });
  }
  function instantanea() {
    dba();
    return auditoria().insertOne({
      momento: new Date(),
      tomada_por: db.runCommand({connectionStatus: 1}).authInfo.authenticatedUsers,
      usuarios: comercial().getUsers().users.map(u => ({user: u.user, db: u.db, roles: u.roles}))
    });
  }
  function rolesApp() {
    const u = comercial().getUser("app_ventas");
    if (!u) throw new Error("No existe app_ventas en comercial");
    return u.roles;
  }
  const esAdminComercial = r => r.role === "dbAdmin" && r.db === "comercial";
  return {
    verificar() {
      dba();
      salida({version: db.version(), modules: db.adminCommand({buildInfo: 1}).modules});
      salida(db.serverCmdLineOpts().parsed);
      salida(db.runCommand({connectionStatus: 1}).authInfo.authenticatedUsers);
      salida(rolesApp());
    },
    estado() {
      dba();
      salida(comercial().getProfilingStatus());
      salida({documentos: comercial().system.profile.countDocuments(), eventosRecientes: lineasLog().length});
    },
    nivel0() { dba(); salida(comercial().setProfilingLevel(0, {filter: "unset"})); },
    incidente() {
      app();
      salida(comercial().clientes.updateOne({_id: 3}, {$set: {rfc: "GAMA780912XXX"}}));
    },
    buscarIncidente() {
      dba();
      salida({documentosPerfil: comercial().system.profile.countDocuments()});
      const eventos = bitacora();
      salida({coincidenciasRFC: eventos.filter(e => JSON.stringify(e).includes("GAMA780912XXX")).length});
      salida(eventos.filter(e => JSON.stringify(e).includes("app-ventas-web")));
      print("Un conteo total puede incluir actividad anterior; revisar fechas.");
    },
    nivel2() { dba(); salida(comercial().setProfilingLevel(2)); salida(comercial().getProfilingStatus()); },
    operaciones() {
      app();
      // La cadena Unicode conserva el nombre exacto de la ciudad del laboratorio.
      salida(comercial().clientes.find({ciudad: "Culiac\u00e1n"}, {nombre: 1, ciudad: 1}).toArray());
      salida(comercial().clientes.updateOne({_id: 3}, {$set: {rfc: "GAMA780912XYZ"}}));
      salida(comercial().clientes.deleteOne({_id: 2}));
    },
    consultarPerfil() {
      dba();
      salida(comercial().system.profile.find({ns: "comercial.clientes"}, {
        op: 1, ns: 1, command: 1, user: 1, client: 1, appName: 1, ts: 1,
        millis: 1, nreturned: 1, docsExamined: 1, nModified: 1, ndeleted: 1
      }).sort({ts: 1}).toArray());
    },
    filtro() {
      dba();
      // Adaptacion: conservar la evidencia anterior; no hacer drop().
      salida(comercial().setProfilingLevel(1, {filter: {op: {$in: ["insert", "update", "remove"]}}}));
      inicioFiltro = new Date();
      salida({inicioFiltro});
      salida(comercial().getProfilingStatus());
    },
    operacionesFiltro() {
      app();
      salida(comercial().clientes.find({_id: 1}).toArray());
      salida(comercial().clientes.updateOne({_id: 1}, {$set: {telefono: "6670000000"}}));
    },
    consultarPerfilFiltro() {
      dba();
      if (!inicioFiltro) throw new Error("Ejecutar filtro() en esta sesion antes de la prueba");
      salida(comercial().system.profile.find({ns: "comercial.clientes", ts: {$gte: inicioFiltro}}).toArray());
    },
    bitacora,
    accesos() {
      dba();
      const eventos = bitacora();
      const resumir = e => ({t: e.t, id: e.id, ctx: e.ctx, user: e.attr?.user,
        client: e.attr?.client, error: e.attr?.error, result: e.attr?.result,
        app: e.attr?.doc?.application?.name ?? "No registrado"});
      salida(eventos.filter(e => e.c === "ACCESS" && e.msg === "Failed to authenticate").map(resumir));
      salida(eventos.filter(e => e.msg === "Successfully authenticated" && e.attr?.user === "app_ventas").slice(-1).map(resumir));
    },
    cambiosPerfilador() {
      dba();
      salida(bitacora().filter(e => e.msg === "Profiler settings changed")
        .map(e => ({t: e.t, ctx: e.ctx, msg: e.msg, attr: e.attr})));
    },
    correlacionar(ctx) {
      dba();
      if (typeof ctx !== "string" || !/^conn\d+$/.test(ctx)) throw new Error("Indicar el ctx real, por ejemplo conn68");
      salida(bitacora().filter(e => e.ctx === ctx &&
        (e.msg === "Successfully authenticated" || e.msg === "Profiler settings changed")));
      print("Correlacionar solo eventos de la misma ejecucion del servidor y fechas coherentes.");
    },
    antesPrivilegios() {
      dba();
      if (rolAgregado) throw new Error("Completar la prueba actual antes de iniciar otra");
      if (rolesApp().some(esAdminComercial)) throw new Error("app_ventas ya tiene dbAdmin; revisar el estado previo sin revocarlo automaticamente");
      idDespues = null;
      const r = instantanea();
      idAntes = r.insertedId;
      salida(r);
      salida(auditoria().findOne({_id: idAntes}));
    },
    otorgarRol() {
      dba();
      if (!idAntes) throw new Error("Tomar antesPrivilegios() primero en esta sesion");
      if (rolesApp().some(esAdminComercial)) throw new Error("El rol ya esta asignado; revisar la ejecucion actual");
      salida(comercial().setProfilingLevel(2));
      comercial().grantRolesToUser("app_ventas", [{role: "dbAdmin", db: "comercial"}]);
      rolAgregado = true;
      salida(rolesApp());
    },
    buscarPrivilegios() {
      dba();
      salida({perfil: comercial().system.profile.countDocuments({"command.grantRolesToUser": {$exists: true}}),
        bitacora: bitacora().filter(e => JSON.stringify(e).includes("grantRoles")).length});
      print("Guardar resultados reales. Cero significa sin coincidencias en estas busquedas.");
    },
    despuesPrivilegios() {
      dba();
      if (!idAntes || !rolAgregado) throw new Error("Completar instantanea inicial y otorgamiento primero");
      const r = instantanea();
      idDespues = r.insertedId;
      salida(r);
    },
    compararInstantaneas() {
      dba();
      if (!idAntes || !idDespues) throw new Error("Se requieren ambas instantaneas de esta sesion");
      salida(auditoria().find({_id: {$in: [idAntes, idDespues]}}).sort({momento: 1}).toArray());
    },
    restaurarRolYFiltro() {
      dba();
      if (!rolAgregado) throw new Error("Esta sesion no otorgo dbAdmin; comprobar el rol antes de revocarlo manualmente");
      if (!idDespues) throw new Error("Guardar despuesPrivilegios() antes de revocar el rol");
      comercial().revokeRolesFromUser("app_ventas", [{role: "dbAdmin", db: "comercial"}]);
      rolAgregado = false;
      salida(comercial().setProfilingLevel(1, {filter: {op: {$in: ["insert", "update", "remove"]}}}));
      salida(rolesApp());
    },
    exportar(rutaLab = "C:/Users/moomo/OneDrive/Escritorio/LAB-02") {
      dba();
      const fs = require("fs"), path = require("path"), crypto = require("crypto");
      const raiz = path.join(rutaLab, "evidencias");
      fs.mkdirSync(raiz, {recursive: true});
      const carpeta = fs.mkdtempSync(path.join(raiz, "exportacion-" + new Date().toISOString().replace(/[:.]/g, "-") + "-"));
      // Exportar command completo y contadores para no perder detalles por proyeccion.
      const perfil = comercial().system.profile.find({}, {op: 1, ns: 1, command: 1,
        user: 1, client: 1, appName: 1, ts: 1, millis: 1, nreturned: 1,
        docsExamined: 1, nModified: 1, ndeleted: 1}).toArray();
      const logs = lineasLog();
      const tomas = auditoria().find({}).sort({momento: 1}).toArray();
      const documentos = {
        "system-profile.json": EJSON.stringify(perfil, null, 2),
        "bitacora-mongod.log": logs.join("\n") + "\n",
        "instantaneas-privilegios.json": EJSON.stringify(tomas, null, 2)
      };
      const hashes = [];
      for (const [nombre, texto] of Object.entries(documentos)) {
        const ruta = path.join(carpeta, nombre);
        fs.writeFileSync(ruta, texto, "utf8");
        hashes.push(crypto.createHash("sha256").update(fs.readFileSync(ruta)).digest("hex") + "  " + nombre);
      }
      fs.writeFileSync(path.join(carpeta, "hashes.sha256"), hashes.join("\n") + "\n", "ascii");
      salida({carpeta, documentos: perfil.length, eventos: logs.length, instantaneas: tomas.length});
      print("Revisar credenciales antes de compartir; si se redactan, recalcular hashes finales.");
      return carpeta;
    }
  };
})();
print("LAB-02 cargado. Invocar una funcion segun README; no se ejecutaron actividades.");
