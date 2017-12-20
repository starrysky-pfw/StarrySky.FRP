using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration;

namespace StarrySky.FRP.Domain.Map
{
    public class UserMap : EntityTypeConfiguration<Model.User>
    {
        public UserMap()
        {
            this.ToTable("User");
            this.HasKey(s => s.Id);

            this.Property(s => s.Code).HasColumnName("Code");
            this.Property(s => s.LoginName).HasColumnName("LoginName").HasMaxLength(8);
            this.Property(s => s.PassWord).HasColumnName("PassWord").HasMaxLength(32);
            this.Property(s => s.UserName).HasColumnName("UserName").HasMaxLength(8);
        }
    }
}
