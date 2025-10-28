import express from 'express';
import jogadorRoutes from '../../presentation/http/jogadorRoutes';
import partidaRoutes from '../../presentation/http/partidaRoutes';
import { translateExceptionMiddleware } from '../../presentation/http/middlewares/translate_exception_middleware';

const app = express();
app.use(express.json());

// rotas
app.use('/api/jogadores', jogadorRoutes);
app.use('/api/partidas', partidaRoutes);

app.get('/api', (req, res) => res.send('API de Jogadores e Partidas funcionando!'));

// middleware de exceções
app.use(translateExceptionMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port', PORT));
