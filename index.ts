import express from 'express';
import AlunosAluno from "./Routes/Aluno/Alunos.aluno.route";
import MateriaAluno from "./Routes/Materia/Materias.aluno.route";
import CursoAluno from "./Routes/Curso/Curso.aluno.route";
import TurmaAluno from "./Routes/Turma/Turma.aluno.route";
import ProfessorAluno from "./Routes/Professor/Professor.aluno.route";


import Css from "./Routes/Render/Css.route"
import Html from "./Routes/Render/Html.route";
import HtmlAutenticado from "./Routes/Render/HtmlAutenticado.route";
import Js from "./Routes/Render/Js.route"
import AlunoAdmin from "./Routes/Aluno/Alunos.admin.route";
import ProfessorAdmin from './Routes/Professor/Professor.admin.route';
import MateriaAdmin from './Routes/Materia/Materias.admin.route';
import TurmaAdmin from './Routes/Turma/Turma.admin.route';
import CursoAdmin from './Routes/Curso/Curso.admin.route';

import ProfessorProfessor from './Routes/Professor/Professor.professor.route';
import AlunoProfessor from "./Routes/Aluno/Alunos.professor.route";
import PessoaAdmin from "./Routes/Pessoa/Pessoa.admin.route";
import TurmaProfessor from "./Routes/Turma/Turma.professor.route"

import Pessoa from "./Routes/Pessoa/Pessoa.route";

import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Middleware } from "./Middleware/Middleware.middleware";

const app = express();
app.use(express.json());
const newMiddleware = new Middleware();

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: '%&8ksjdk',
    cookie: { maxAge: 6000000 },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost:27017/pds2'
    })
}));

app.use(Html);
app.use(Css);

app.use(Js);
app.use(Pessoa);

app.use(express.static('Public'))

// app.use(async(req:Request, res:any, next:any)=>{
//     await newMiddleware.verificarSession(req, res, next);
// });

app.use(MateriaAluno);
app.use(CursoAluno);
app.use(TurmaAluno);
app.use(AlunosAluno);
app.use(ProfessorAluno);

app.use(AlunoProfessor);
app.use(ProfessorProfessor)
app.use(TurmaProfessor)

app.use(HtmlAutenticado);
app.use(AlunoAdmin);
app.use(ProfessorAdmin);
app.use(MateriaAdmin);
app.use(TurmaAdmin);
app.use(PessoaAdmin);
app.use(CursoAdmin);


app.listen(3000, () => {
    console.log('Server Run');
});