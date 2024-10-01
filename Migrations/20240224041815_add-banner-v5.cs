using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace course_edu_api.Migrations
{
    /// <inheritdoc />
    public partial class addbannerv5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Banners_BackgroundColor_BackgroundColorId",
                table: "Banners");

            migrationBuilder.DropTable(
                name: "BackgroundColor");

            migrationBuilder.DropIndex(
                name: "IX_Banners_BackgroundColorId",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "BackgroundColorId",
                table: "Banners");

            migrationBuilder.AddColumn<string>(
                name: "EndColor",
                table: "Banners",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StartColor",
                table: "Banners",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndColor",
                table: "Banners");

            migrationBuilder.DropColumn(
                name: "StartColor",
                table: "Banners");

            migrationBuilder.AddColumn<int>(
                name: "BackgroundColorId",
                table: "Banners",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BackgroundColor",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    End = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Start = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BackgroundColor", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Banners_BackgroundColorId",
                table: "Banners",
                column: "BackgroundColorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Banners_BackgroundColor_BackgroundColorId",
                table: "Banners",
                column: "BackgroundColorId",
                principalTable: "BackgroundColor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
