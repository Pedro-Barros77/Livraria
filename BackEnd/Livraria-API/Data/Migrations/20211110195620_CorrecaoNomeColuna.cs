using Microsoft.EntityFrameworkCore.Migrations;

namespace Livraria_API.Data.Migrations
{
    public partial class CorrecaoNomeColuna : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuantitadeTotal",
                table: "Livros",
                newName: "QuantidadeTotal");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuantidadeTotal",
                table: "Livros",
                newName: "QuantitadeTotal");
        }
    }
}
