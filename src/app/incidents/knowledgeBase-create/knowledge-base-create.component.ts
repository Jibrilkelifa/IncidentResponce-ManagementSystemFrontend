import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KnowledgeBaseService } from 'src/app/services/knowledge-base.service';
import { KnowledgeBaseArticle } from 'src/app/models/KnowledgeBaseArticle';

@Component({
  selector: 'app-knowledge-base-create',
  templateUrl: './knowledge-base-create.component.html',
})
export class KnowledgeBaseCreateComponent {
  article: KnowledgeBaseArticle = {
    id: 0,
    title: '',
    content: '',
    category: '',
    tags: '',
    createdAt: '',
    updatedAt: '',
  };

  // Predefined list of categories
 
    categoryOptions = [
      { label: 'Firewall Configuration', value: 'Firewall Configuration' },
      { label: 'Incident Response', value: 'Incident Response' },
      { label: 'Malware Analysis', value: 'Malware Analysis' },
      { label: 'Security Best Practices', value: 'Security Best Practices' }
    ];

  constructor(
    private knowledgeBaseService: KnowledgeBaseService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Ensure the form data is correctly sent
    if (this.article.title && this.article.content && this.article.category) {
      this.knowledgeBaseService.createArticle(this.article).subscribe((createdArticle) => {
        this.router.navigate(['/knowledge-base']);
      });
    } else {
      alert('Please fill all required fields.');
    }
  }
}
