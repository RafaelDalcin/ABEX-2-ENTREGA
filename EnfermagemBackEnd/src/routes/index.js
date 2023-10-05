import gruposRoute from './gruposRoute';
import alunosRoute from './alunosRoute';
import usuariosRoute from './usuariosRoute';
import familiasRoute from './familiasRoute';

function Routes(app) {
    alunosRoute(app);
    gruposRoute(app);
    usuariosRoute(app);
    familiasRoute(app);
}

export default Routes;