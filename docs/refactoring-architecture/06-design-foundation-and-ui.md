# 06 — Design Foundation & UI Architecture

## 1. Quyết định

Atomic Design **không được sử dụng như folder architecture** trong target source.

Không tạo:

```text
atoms/
molecules/
organisms/
templates/
```

Lý do chính:

1. HeroUI đã cung cấp phần lớn primitive UI mà Atom layer thường đảm nhiệm.
2. Code cũ cho thấy wrapper abstraction không thống nhất giữa developer.
3. DDD/module ownership đã giải quyết câu hỏi component thuộc business capability nào.
4. Việc phân loại Molecule/Organism không tạo đủ giá trị so với complexity bổ sung.

Atomic decomposition vẫn có thể là tư duy khi chia component, nhưng không phải taxonomy trong source.

## 2. HeroUI là primitive layer

Nếu HeroUI đã có primitive phù hợp thì dùng trực tiếp:

```text
Button
Input
Select
Textarea
Modal
Card
Chip
...
```

Không tạo wrapper chỉ để thêm class/theme.

## 3. Design consistency thuộc Design Foundation

Những concern sau phải được chuẩn hóa tại Design Foundation:

- color;
- typography;
- spacing;
- radius;
- border;
- shadow;
- hover/focus/disabled pattern;
- reusable visual class;
- HeroUI theme/style integration.

Current `src/app/globals.css` đã có nền tảng tốt và được tiếp tục dùng/chuẩn hóa.

## 4. Styling không phải lý do tạo component

Sai pattern:

```text
HeroUI Button
     ↓
AppButton
     ↓
PrimaryButton
     ↓
FeatureButton
```

nếu các layer chỉ thêm style.

Target:

```text
HeroUI Button
     +
Design Foundation class/token
     ↓
Business/shared composition
```

## 5. `AppButton` hiện tại

`src/components/hero-ui/AppButton.tsx` được đánh dấu **DELETE/REWRITE USAGE** trong migration.

Các usage phải chuyển sang HeroUI `Button` trực tiếp + design class/token phù hợp.

Navigation bằng `Link` được xử lý theo context của component, không tạo một primitive wrapper toàn app chỉ để hỗ trợ `href`.

## 6. Khi nào được tạo `ui` component

Component Home/Admin-wide trong `ui/` chỉ hợp lệ khi có abstraction thật, ví dụ:

- reusable composition;
- reusable behavior;
- semantic UI contract;
- accessibility behavior;
- interaction pattern dùng xuyên business module.

Ví dụ candidate:

```text
SectionHeading
EmptyState
ResponsiveCarousel
```

Không tạo `AppInput`, `AppSelect`, `AppButton` nếu chỉ wrap HeroUI styling.

## 7. Business-aware UI

Component biết business concept phải nằm trong business module presentation.

Ví dụ:

```text
JobCard                 → recruitment/presentation
JobApplicationForm      → recruitment/presentation
GameProjectCard         → portfolio/presentation
ArticleCard             → editorial/presentation
PartnershipInquiryForm  → partnership/presentation
```

Dù `JobCard` có hình thức giống một Molecule/Organism, Atomic level không quyết định ownership.

## 8. Form reuse

Không merge hai business form chỉ vì chúng có cùng field shape.

Ví dụ:

```text
JobApplicationForm
PartnershipInquiryForm
```

là hai business use case riêng.

Chỉ extract phần thật sự business-agnostic nếu cần, ví dụ một form composition/behavior dùng chung.

## 9. Design Foundation source of truth

V1 tiếp tục lấy global design tokens/classes làm source of truth. Khi phát triển thêm Admin, Home và Admin có thể dùng cùng convention nhưng không bắt buộc share mọi visual pattern nếu UI context khác nhau.
