using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration;
using StarrySky.FRP.Domain.Model;

namespace StarrySky.FRP.Domain.Map
{
    public class AccountMap : EntityTypeConfiguration<Account>
    {
        public AccountMap()
        {
            this.ToTable("Account");

            this.Property(s => s.AccountName).HasColumnName("AccountName").HasMaxLength(8);
            this.Property(s => s.CardNumber).HasColumnName("CardNumber").HasMaxLength(32);
            this.Property(s => s.Memo).HasColumnName("Memo").HasMaxLength(64);
        }
    }

    /// <summary>
    /// 收入
    /// </summary>
    public class AccountForInMap : EntityTypeConfiguration<AccountForIn>
    {
        public AccountForInMap()
        {
            this.ToTable("AccountIn");
            this.HasKey(s => s.Id);
            this.Property(s => s.Memo).HasColumnName("Memo").HasMaxLength(64);

            this.HasRequired(s => s.Account).WithMany().HasForeignKey(s => s.AccountId);
        }
    }

    /// <summary>
    /// 支出
    /// </summary>
    public class AccountForOutMap : EntityTypeConfiguration<AccountForOut>
    {
        public AccountForOutMap()
        {
            this.ToTable("AccountOut");
            this.HasKey(s => s.Id);
            this.Property(s => s.Memo).HasColumnName("Memo").HasMaxLength(64);

            this.HasRequired(s => s.Account).WithMany().HasForeignKey(s => s.AccountId);
        }
    }
}
