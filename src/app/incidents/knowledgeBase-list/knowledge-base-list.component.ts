import { Component, OnInit } from '@angular/core';
import { KnowledgeBaseService } from 'src/app/services/knowledge-base.service';
import { KnowledgeBaseArticle } from 'src/app/models/KnowledgeBaseArticle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knowledge-base-list',
  templateUrl: './knowledge-base-list.component.html',
  styleUrls: ['./knowledge-base-list.component.css'],
})
export class KnowledgeBaseListComponent implements OnInit {
  articles: KnowledgeBaseArticle[] = [];
  paginatedArticles: KnowledgeBaseArticle[] = [];
  searchTerm: string = '';
  totalRecords: number = 0;
  totalPages: number[] = [];
  currentPage: number = 0;
  rows: number = 10;
  visiblePages: number[] = []; // Pages to display in the UI
  pageRange = 3

  constructor(private knowledgeBaseService: KnowledgeBaseService, private router: Router) {}

  ngOnInit(): void {
    this.fetchArticles();  // Load articles on page load
  }

  fetchArticles(): void {
    if (this.searchTerm) {
      this.knowledgeBaseService.searchArticles(this.searchTerm).subscribe((data) => {
        this.articles = data;
        this.totalRecords = this.articles.length;
        this.calculateTotalPages();
        this.paginate();
      });
    } else {
      this.knowledgeBaseService.getAllArticles().subscribe((data) => {
        this.articles = data;
        this.totalRecords = this.articles.length;
        this.calculateTotalPages();
        this.paginate();
      });
    }
  }

  // Calculate total pages based on the total records and rows per page
  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.totalRecords / this.rows);
    this.totalPages = Array(totalPages).fill(0).map((_, i) => i);
    this.updateVisiblePages();
  }

  // Paginate the articles
  paginate(): void {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedArticles = this.articles.slice(start, end);
  }
  loadPage(): void {
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.paginatedArticles = this.articles.slice(start, end);
  }

  // Move to the previous page
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginate();
    }
  }

  // Move to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages.length - 1) {
      this.currentPage++;
      this.paginate();
    }
  }

  goToPage(index: number): void {
    if (index >= 0 && index < this.totalPages.length) {
      this.currentPage = index;
      this.loadPage();
      this.updateVisiblePages();
    }
  }
  
updateVisiblePages(): void {
      const start = Math.max(0, this.currentPage - this.pageRange);
      const end = Math.min(this.totalPages.length, this.currentPage + this.pageRange + 1);
    
      this.visiblePages = [];
      if (start > 0) this.visiblePages.push(0); // Always include the first page
      if (start > 1) this.visiblePages.push(-1); // Indicator for skipped pages
    
      for (let i = start; i < end; i++) {
        this.visiblePages.push(i);
      }
    
      if (end < this.totalPages.length - 1) this.visiblePages.push(-1); // Indicator for skipped pages
      if (end < this.totalPages.length) this.visiblePages.push(this.totalPages.length - 1); // Always include the last page
  }


  // View details of an article
  viewArticle(id: number): void {
    this.router.navigate(['/knowledge-base', id]);
  }

  // Search function
  onSearch(): void {
    this.fetchArticles();  // Fetch articles based on the search term
  }
}