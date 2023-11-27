import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud"; // Replace with your API endpoint
  private authToken = 'VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM';

  constructor(private http: HttpClient) {}

  queryImage(payload: any): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'image/png',
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, payload, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
