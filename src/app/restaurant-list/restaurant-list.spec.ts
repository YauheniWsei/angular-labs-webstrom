import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantList } from './restaurant-list';

describe('RestaurantList', () => {
  let component: RestaurantList;
  let fixture: ComponentFixture<RestaurantList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantList],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const count = () => (fixture.nativeElement as HTMLElement).querySelector('.results-count')?.textContent?.trim();

  const clickButton = (text: string) => {
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('button');
    Array.from(buttons).find((b) => b.textContent?.trim() === text)?.click();
  };

  it('should filter by cuisine and only active', async () => {
    clickButton('Polska');
    await fixture.whenStable();
    expect(count()).toBe('Znaleziono: 40');

    const checkbox = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('input[type=checkbox]')!;
    checkbox.click();
    await fixture.whenStable();
    const polishActive = Number(count()?.split(' ')[1]);
    expect(polishActive).toBeLessThanOrEqual(40);
  });

  it('should search by name', async () => {
    const search = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('#rest-search')!;
    search.value = 'pierogarnia pod';
    search.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const firstName = (fixture.nativeElement as HTMLElement).querySelector('.rest-name')?.textContent;
    expect(firstName).toContain('Pierogarnia Pod');
  });

  it('should sort by rating descending', async () => {
    clickButton('Najlepiej oceniane');
    await fixture.whenStable();
    const ratings = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.rest-details dd:nth-of-type(3)')).map(
      (el) => Number(el.textContent?.replace('★', '').trim()),
    );
    expect(ratings[0]).toBeGreaterThanOrEqual(ratings[ratings.length - 1]);
    expect(ratings[0]).toBe(5.9);
  });
});
