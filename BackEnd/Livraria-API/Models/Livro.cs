using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Livraria_API.Models
{
    public class Livro
    {
        public int ID { get; set; }

        [MaxLength(50), MinLength(1)]
        public string Titulo { get; set; }

        public float Valor { get; set; }

        [ForeignKey("Autor")]
        public int? AutorID { get; set; }
        public virtual Autor? Autor { get; set; }

        [ForeignKey("Fornecedor")]
        public int? FornecedorID { get; set; }
        public virtual Fornecedor? Fornecedor { get; set; }

    }
}