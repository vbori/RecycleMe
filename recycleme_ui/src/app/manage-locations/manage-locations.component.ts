import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.scss']
})
export class ManageLocationsComponent implements OnInit {
  locations: any[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getLocations().subscribe(
      response => {
        this.locations = response.locations;
      },
      error => {
        console.error('Error fetching locations', error);
      }
    );
  }

  addLocation() {
    // Logic for adding a new location
  }

  editLocation(id: string) {
    // Logic for editing a location
  }

  deleteLocation(id: string) {
    this.locationService.deleteLocation(id).subscribe(
      response => {
        this.locations = this.locations.filter(location => location.id !== id);
      },
      error => {
        console.error('Error deleting location', error);
      }
    );
  }
}
