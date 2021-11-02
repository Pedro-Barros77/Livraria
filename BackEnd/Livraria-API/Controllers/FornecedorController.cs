using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Livraria_API.Data;
using Livraria_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Livraria_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedorController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public FornecedorController(LivrariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Fornecedor> Get()
        {
            return _context.Fornecedores;
        }

        [HttpPut]
        public Fornecedor GetByID(int id)
        {
            return _context.Fornecedores.FirstOrDefault(Forn => Forn.ID == id);
        }

        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }
    }
}
