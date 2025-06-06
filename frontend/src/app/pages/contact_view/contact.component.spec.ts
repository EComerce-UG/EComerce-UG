import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms'; 

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent, // Componente standalone
        FormsModule       // Solo si usas ngModel en el formulario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba 1: Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 2: Verifica que el formulario renderiza los campos
  it('should render form fields', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="name"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="email"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[name="message"]')).toBeTruthy();
  });

  // Prueba 3: Verifica el envío del formulario
  it('should call submitForm() on button click', () => {
    spyOn(component, 'submitForm');
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(component.submitForm).toHaveBeenCalled();
  });

  // Prueba 4: Verifica el binding de datos (si usas ngModel)
  it('should update formData on input change', () => {
    const nameInput = fixture.nativeElement.querySelector('input[name="name"]');
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formData.name).toEqual('John Doe');
  });
});