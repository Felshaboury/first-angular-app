import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import Player from 'rrweb-player';
import { map } from 'rxjs/operators';
import { LogService } from './log.service';
@Component({
  selector: 'app-bug-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bug-review.component.html',
  styleUrls: ['./bug-review.component.css']
})
export class BugReviewComponent implements OnInit {
  bugReports: any[] = [];
  selectedRecording: any;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.fetchBugReports();
  }

  fetchBugReports(): void {
    this.logService.getBugReports().pipe(
      map(reports => reports.map(report => ({
        ...report,
        recording: JSON.parse(report['recording'] || '[]')
      })))
    ).subscribe(
      reports => this.bugReports = reports,
      error => console.error('Error fetching bug reports:', error)
    );
  }
  
  viewRecording(report: any): void {
    this.selectedRecording = report;
    this.initializePlayer();

    const modalElement = document.getElementById('playbackModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  initializePlayer(): void {
    if (this.selectedRecording) {
      const playerElement = document.getElementById('player');
      if (playerElement) {
        new Player({
          target: playerElement,
          props: {
            events: this.selectedRecording.recording
          }
        });
      }
    }
  }
}
