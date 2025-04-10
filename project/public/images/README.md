# Public Images Directory

Store images here that need to be:
- Dynamically referenced
- Accessed via direct URL
- Shared across multiple components

## Usage

Reference images from this directory using absolute paths:

```tsx
function Component() {
  return <img src="/images/photo.jpg" alt="Photo" />;
}
```

The `/images` path will resolve correctly both in development and production.