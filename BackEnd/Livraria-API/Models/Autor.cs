using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Livraria_API.Models
{
    public class Autor
    {
        public int ID { get; set; }

        [MaxLength(30), MinLength(1)]
        public string Nome { get; set; }

        public virtual ICollection<Livro> Livros { get; set; }
    }
}