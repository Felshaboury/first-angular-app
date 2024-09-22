import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as rrweb from 'rrweb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bugTitle = '';
  bugDescription = '';
  bugSteps = '';
  bugPriority = '';
  bugCategory = '';
  recordingEvents: any[] = [];
  isRecording: boolean = false;
  isModalVisible: boolean = false;

  constructor(private firestore: Firestore) {}

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  // Start rrweb recording
  startRecording() {
    this.isRecording = true;
    this.recordingEvents = [];  // Reset previous recordings

    rrweb.record({
      emit: (event) => {
        this.recordingEvents.push(event); // Save events during recording
      }
    });
    console.log('Recording started');
    this.closeModal();  // Close the modal when recording starts
  }

  // Stop rrweb recording
  stopRecording() {
    this.isRecording = false;
    console.log('Recording stopped');
    this.openModal();  // Open the modal when recording stops
  }

  // Function to submit bug report
  async submitBugReport() {
    if (this.isFormValid()) {
      const bugReport = {
        title: this.bugTitle,
        description: this.bugDescription,
        stepsToReproduce: this.bugSteps,
        priority: this.bugPriority,
        category: this.bugCategory,
        recording: JSON.stringify(this.recordingEvents),
        timestamp: Date.now()
      };

      try {
        const bugReportRef = collection(this.firestore, 'bugReports');
        await addDoc(bugReportRef, bugReport);
        console.log('Bug report added successfully');
        this.closeModal();  // Close modal after submission
      } catch (error) {
        console.error('Error adding bug report:', error);
      }
    } else {
      console.error('Please fill all required fields.');
    }
  }

  // Simple validation for form fields
  isFormValid() {
    return (
      this.bugTitle.trim() &&
      this.bugDescription.trim() &&
      this.bugSteps.trim() &&
      this.bugPriority.trim() &&
      this.bugCategory.trim()
    );
  }
}
