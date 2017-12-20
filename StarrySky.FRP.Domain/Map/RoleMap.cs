using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration;
using StarrySky.FRP.Domain.Model;

namespace StarrySky.FRP.Domain.Map
{
    public class RoleMap : EntityTypeConfiguration<Role>
    {
        public RoleMap()
        {
            this.HasKey(s => s.Id);
            this.ToTable("Role");

            this.Property(s => s.Name).HasColumnName("Name").HasMaxLength(16);
            this.Property(s => s.Memo).HasColumnName("Memo").HasMaxLength(256);
        }
    }
}
