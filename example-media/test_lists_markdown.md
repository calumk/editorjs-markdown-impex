
<!-- Unorderd List -->
> This is a Unordered List : 

```markdown
* A
* B
* C
```

* A
* B
* C

---

<!-- Ordered List -->
> This is an Ordered List : 

```markdown
1. A
2. B
3. C
```

1. A
2. B
3. C

---

<!-- Checkbox List -->
> This is a Checkbox List : 

```markdown
- Not Checked 1
- [ ] Not Checked 2
- [x] Checked
```

- Not Checked 1
- [ ] Not Checked 2
- [x] Checked

---

<!-- Nested unordered List -->
> This is a Nested Unordered List : 

```markdown
* A
    * B
    * C
* D
    * E
    * F
```

* A
    * B
    * C
* D
    * E
    * F

---

<!-- Nested ordered List -->
> This is a Nested Ordered List : 

```markdown
1. A
    1. B
    2. C
2. D
    3. E
```

1. A
    1. B
    2. C
2. D
    3. E

---


<!-- Nested Unordered Checkbox List -->
> This is a Nested Unordered Checkbox List : 

```markdown
- A : No Check
    - [ ] B : False Checked
    - [x] C : True Checked
        - D : No Check
            - [ ] E : False Checked
            - [x] F : True Checked
```

- A : No Check
    - [ ] B : False Checked
    - [x] C : True Checked
        - D : No Check
            - [ ] E : False Checked
            - [x] F : True Checked

---


<!-- Nested Unordered Checkbox List -->
> This is a Nested Ordered Checkbox List : 

```markdown
1. A : No Check
    1. [ ] B : False Checked
    2. [x] C : True Checked
        1. D : No Check
            1. [ ] E : False Checked
            1. [x] F : True Checked
```

1. A : No Check
    1. [ ] B : False Checked
    2. [x] C : True Checked
        1. D : No Check
            1. [ ] E : False Checked
            1. [x] F : True Checked


---
---
---

<!-- Nested Unordered Checkbox List -->

## Here be dragons. 

> :red_square: This is a Mess of a list, that will probably fail, due to a mix of numbers and bullets, it cannot be properly abstracted by remark. It fails if the type changes on sa single level - I dont know why, and probably wont spend time to fix.

```markdown
1. A : No Check
    * [ ] B : False Checked
    * [x] C : True Checked
        2. D : No Check
            * [ ] E : False Checked
            1. [x] F : True Checked
        7. [ ] G : 

```

1. A : No Check
    * [ ] B : False Checked
    * [x] C : True Checked
        2. D : No Check
            * [ ] E : False Checked
            1. [x] F : True Checked
        7. [ ] G : 


