const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 3000;

// Configuração do CORS
const corsOptions = {
  origin: "*", // Permitir todas as origens (substitua por um domínio específico, se necessário)
  methods: "GET,POST,OPTIONS", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
};

app.use(cors(corsOptions));

// Middleware para lidar com form-data
const upload = multer();

// Endpoint GET para verificar o status do servidor
app.get("/", (req, res) => {
  res.status(200).send("Servidor está rodando!");
});

app.post("/process_file", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const fileData = req.file.buffer;
  const fileMimeType = req.file.mimetype;
  const fileName = "file.pdf"; // Usamos o nome de arquivo padrão 'file.pdf'

  const responseData = [
    {
      binary: {
        data: Buffer.from(fileData).toString("base64"), // Codificamos para Base64
        mimeType: fileMimeType,
        fileName: fileName,
      },
    },
  ];

  res.status(200).json(responseData);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Alterar dados de domínio e porta
});
