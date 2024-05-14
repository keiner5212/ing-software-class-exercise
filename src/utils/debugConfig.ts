import Debug from 'debug';
// Debug.enable('*');
Debug.enable('*,-express:router:route, -express:router, -body-parser:json,-express:application,-express:router:layer');

// server debugger
const serverDebugger = Debug('server');

// controller debugger
const controllerDebugger = Debug('controller');

// db debugger
const dbDebugger = Debug('db');

// auth debugger
const authDebugger = Debug('auth');

// utils debugger
const utilsDebugger = Debug('utils');

// repository debugger
const repositoryDebugger = Debug('repository');

// entity debugger
const entityDebugger = Debug('entity');

// middleware debugger
const middlewareDebugger = Debug('middleware');

// error debugger
const errorDebugger = Debug('error');

//dao debugger
const daoDebugger = Debug('dao');


export {
    serverDebugger, controllerDebugger,
    dbDebugger, authDebugger, utilsDebugger,
    repositoryDebugger, entityDebugger, middlewareDebugger,
    errorDebugger, daoDebugger
};
