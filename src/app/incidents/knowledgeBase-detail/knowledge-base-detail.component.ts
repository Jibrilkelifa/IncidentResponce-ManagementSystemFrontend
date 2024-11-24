import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident-model';
import { Update } from '../../models/update';
import { KnowledgeBaseArticle } from 'src/app/models/KnowledgeBaseArticle';
import { KnowledgeBaseService } from 'src/app/services/knowledge-base.service';

@Component({
  selector: 'app-knowledge-base-detail',
  templateUrl: './knowledge-base-detail.component.html',
  styleUrls: ['./knowledge-base-detail.component.css'],
})
export class KnowledgeBaseDetailComponent implements OnInit {
  article: KnowledgeBaseArticle | undefined;

  constructor(
    private route: ActivatedRoute,
    private knowledgeBaseService: KnowledgeBaseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.knowledgeBaseService.getArticleById(Number(id)).subscribe((article) => {
        this.article = article;
      });
    }
  }
}
