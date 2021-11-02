using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Livraria_API.Models
{
    public class Estoque
    {
        public int ID { get; set; }

        public int Quantidade { get; set; }

        public int MinQuantidade { get; set; }

        [ForeignKey("Livro")]
        public int LivroID { get; set; }

        public virtual Livro Livro { get; set; }
    }
}