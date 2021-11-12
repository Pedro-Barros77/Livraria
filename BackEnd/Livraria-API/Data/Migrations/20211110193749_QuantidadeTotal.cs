using Microsoft.EntityFrameworkCore.Migrations;

namespace Livraria_API.Data.Migrations
{
    public partial class QuantidadeTotal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuantitadeTotal",
                table: "Livros",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantitadeTotal",
                table: "Livros");
        }
    }
}
