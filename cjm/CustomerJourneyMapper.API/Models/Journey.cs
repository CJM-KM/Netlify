using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerJourneyMapper.API.Models
{
    public class Journey
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<Stage> Stages { get; set; }
    }

    public class Stage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public int JourneyId { get; set; }
        [ForeignKey("JourneyId")]
        public virtual Journey Journey { get; set; }

        public virtual ICollection<Touchpoint> Touchpoints { get; set; }
    }

    public class Touchpoint
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [StringLength(50)]
        public string Channel { get; set; }

        public int StageId { get; set; }
        [ForeignKey("StageId")]
        public virtual Stage Stage { get; set; }

        public virtual ICollection<PainPoint> PainPoints { get; set; }
        public virtual ICollection<Opportunity> Opportunities { get; set; }
    }

    public class PainPoint
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        public int TouchpointId { get; set; }
        [ForeignKey("TouchpointId")]
        public virtual Touchpoint Touchpoint { get; set; }
    }

    public class Opportunity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        public int TouchpointId { get; set; }
        [ForeignKey("TouchpointId")]
        public virtual Touchpoint Touchpoint { get; set; }
    }
} 