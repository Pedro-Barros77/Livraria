using Microsoft.EntityFrameworkCore.Migrations;

namespace Livraria_API.Data.Migrations
{
    public partial class DataRegistro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataVenda",
                table: "Estoques",
                newName: "DataRegistro");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataRegistro",
                table: "Estoques",
                newName: "DataVenda");
        }
    }
}
