using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration;
using StarrySky.FRP.Domain.Model;

namespace StarrySky.FRP.Domain.Map
{
    public class UserRoleMap : EntityTypeConfiguration<UserRole>
    {
        public UserRoleMap()
        {
            this.ToTable("UserRole");

            this.HasKey(s => s.Id);
            this.Property(s => s.RoleId).HasColumnName("RoleId");
            this.Property(s => s.UserId).HasColumnName("UserId");

            this.HasRequired(s => s.User).WithMany().HasForeignKey(s => s.UserId);
            this.HasRequired(s => s.Role).WithMany().HasForeignKey(s => s.RoleId);
        }
    }
}
