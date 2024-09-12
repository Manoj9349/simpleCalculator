import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return 0 for an empty string', () => {
    expect(component.add('')).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    expect(component.add('1')).toBe(1);
  });

  it('should return the sum of two numbers separated by a comma', () => {
    expect(component.add('1,5')).toBe(6);
  });

  it('should handle new line as a separator', () => {
    expect(component.add('1\n2,3')).toBe(6);
  });

  it('should handle custom delimiters', () => {
    expect(component.add('//;\n1;2')).toBe(3);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => component.add('1,-2,3,-4')).toThrowError('Negative numbers not allowed: -2,-4');
  });
});
