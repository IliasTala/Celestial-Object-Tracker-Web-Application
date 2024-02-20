using SpaceInvader.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpaceInvader.Models
{
    public class Observation
    {
        public int ObservationId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("CelestialObject")]
        public int CelestialObjectId { get; set; }
        public CelestialObject CelestialObject { get; set; }
        public DateTime ObservationDateTime { get; set; }
        public string ObservationLocation { get; set; }
    }
}
