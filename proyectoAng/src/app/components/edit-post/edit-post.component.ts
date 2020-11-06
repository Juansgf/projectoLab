import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private elementRef: ElementRef) { }

  id :String
  cont:String


  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.id = params['post_id'];
   // (+) converts string 'id' to a number         
    // In a real app: dispatch action to load the details here.     });
    })
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'gray';
  }

}
