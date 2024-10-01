using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace course_edu_api.Migrations
{
    /// <inheritdoc />
    public partial class ver3banner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LinkAction",
                table: "Banners",
                newName: "ActionLink");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ActionLink",
                table: "Banners",
                newName: "LinkAction");
        }
    }
}
