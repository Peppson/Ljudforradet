// Global settings
Globals = Obj(new
{
    debugOn = true, // todo
    detailedAclDebug = false,
    aclOn = true,
    isSpa = true,
    port = args[0],
    serverName = "Ljudförrådet Backend",
    frontendPath = args[1],
    dbPath = args[2],
    sessionLifeTimeHours = 2
});

Server.Start();