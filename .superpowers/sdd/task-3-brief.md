### Task 3: Reduced-motion hook + scroll progress

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.ts`
- Create: `src/components/ScrollProgress.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean`
- Produces: `<ScrollProgress />` ג€” fixed top bar width = scroll %

- [ ] **Step 1: Implement hook**

```ts
// src/hooks/usePrefersReducedMotion.ts
import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Implement ScrollProgress**

```tsx
// src/components/ScrollProgress.tsx
import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
      aria-hidden
    >
      <div className="h-full bg-accent origin-left" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ScrollProgress;
```

- [ ] **Step 3: Mount in `App.tsx` after Header** (or before): `<ScrollProgress />`

- [ ] **Step 4: Commit**

```bash
git add src/hooks/usePrefersReducedMotion.ts src/components/ScrollProgress.tsx src/App.tsx
git commit -m "feat: add reduced-motion hook and scroll progress bar"
```

---

