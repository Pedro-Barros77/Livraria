using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Livraria_API.Models
{
    public class Fornecedor
    {
        public int ID { get; set; }

        [MaxLength(40), MinLength(1)]
        public string Nome { get; set; }

        [MaxLength(50), MinLength(1)]
        public string? Email { get; set; }

        [MaxLength(11)]
        public string? Telefone { get; set; }

        public virtual ICollection<Livro> Livros { get; set; }
    }
}