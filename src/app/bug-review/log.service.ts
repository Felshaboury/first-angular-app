import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logsCollection;

  constructor(private firestore: Firestore) {
    this.logsCollection = collection(this.firestore, 'logs');
  }

  async addLog(message: string): Promise<void> {
    try {
      await addDoc(this.logsCollection, {
        message: message,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error adding log:', error);
    }
  }

  getLogs(): Observable<any[]> {
    return collectionData(this.logsCollection, { idField: 'id' }) as Observable<any[]>;
  }

  searchLogs(queryString: string): Observable<any[]> {
    return this.getLogs().pipe(
      map(logs => logs.filter(log => log.message.toLowerCase().includes(queryString.toLowerCase())))
    );
  }
  async addBugReport(bugReport: any): Promise<void> {
    const bugReportRef = collection(this.firestore, 'bugReports');
    console.log('Adding bug report:', bugReport);
    try {
      await addDoc(bugReportRef, bugReport);
      console.log('Bug report added successfully');
    } catch (error) {
      console.error('Error adding bug report:', error);
    }
  }
  

  getBugReports() {
    const bugReportsCollection = collection(this.firestore, 'bugReports');
    return collectionData(bugReportsCollection);
  }
}
