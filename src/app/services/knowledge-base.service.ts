import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KnowledgeBaseArticle } from '../models/KnowledgeBaseArticle';


@Injectable({
  providedIn: 'root',
})
export class KnowledgeBaseService {
   private apiUrl = `http://localhost:8091/api/knowledge-base`;
  //  private apiUrl = `http://10.12.51.70:8091/api/knowledge-base`;


  constructor(private http: HttpClient) {}

  // Create a new article
  createArticle(article: KnowledgeBaseArticle): Observable<KnowledgeBaseArticle> {
    return this.http.post<KnowledgeBaseArticle>(`${this.apiUrl}/create`, article);
  }

  // Get all articles
  getAllArticles(): Observable<KnowledgeBaseArticle[]> {
    return this.http.get<KnowledgeBaseArticle[]>(`${this.apiUrl}/list`);
  }
  searchArticles(searchTerm: string): Observable<KnowledgeBaseArticle[]> {
    return this.http.get<KnowledgeBaseArticle[]>(`${this.apiUrl}/search`, { params: { searchTerm } });
}

  // Get article by ID
  getArticleById(id: number): Observable<KnowledgeBaseArticle> {
    return this.http.get<KnowledgeBaseArticle>(`${this.apiUrl}/${id}`);
  }
  refreshResolvedIncidentsWithArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resolved-incidents-with-articles`);
  }

  // Delete article by ID
  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
