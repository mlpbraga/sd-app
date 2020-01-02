# sd-api
API que conecta com o banco de dados para executar todas as requisições necessárias para o banco

**Como rodar local:**

Construir o container com suas dependências e inicializa-lo:

```sh
$ make build
$ make start
```

Acessar o endpoint `localhost:4513` no browser, a resposta deve ser o JSON:

```json
// 20190523150507
// http://localhost:4513/

{
  "status": "OK"
}
```

**Comandos úteis:**

- `make build`
- `make start`
- `make stop`
- `make logs-tail`
- `make lint`
