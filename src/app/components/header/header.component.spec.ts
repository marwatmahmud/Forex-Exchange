import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";

describe('header component tests', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent]
        });

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the title', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Forex Exchange');
      });
      it('should render the description', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.font-semibold').textContent).toContain('Check out the current price for a currency pair');
      });


});