using Microsoft.AspNetCore.Mvc;
using SpaceInvader.Interfaces;
using SpaceInvader.Models;
using System.Collections.Generic;

namespace SpaceInvaders.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ObservationController : ControllerBase
    {
        private readonly IObservationRepository _observationRepository;

        public ObservationController(IObservationRepository observationRepository)
        {
            _observationRepository = observationRepository;
        }

        /*[HttpPost]
        public IActionResult CreateObservation([FromBody] Observation observation)
        {
            _observationRepository.Add(observation);
            return CreatedAtAction(nameof(GetObservation), new { id = observation.ObservationId }, observation);
        }

        [HttpGet("{id}")]
        public IActionResult GetObservation(int id)
        {
            var observation = _observationRepository.GetById(id);
            if (observation == null)
            {
                return NotFound();
            }
            return Ok(observation);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetObservationsForUser(int userId)
        {
            var observations = _observationRepository.GetAllObservationsForUser(userId);
            return Ok(observations);
        }*/
    }
}
