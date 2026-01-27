# Research & Decisions

## Decision: Technology Stack
- **Decision**: Adhere to the pre-defined technology stack: FastAPI, SQLModel, Neon PostgreSQL, and `python-jose` for JWTs.
- **Rationale**: The technology stack was explicitly defined in the project requirements. No research was needed to select alternatives. This stack is modern, performant, and well-suited for the project's goals.
- **Alternatives Considered**: None, as the stack was mandated.

## Decision: JWT Handling Library
- **Decision**: Use `python-jose[pycryptodome]` for JWT processing.
- **Rationale**: It is a mature library that supports a wide range of JWT algorithms and is actively maintained. `pyjwt` is also a strong candidate, but `python-jose` provides a slightly broader feature set if future needs were to evolve. For this project, either would suffice, but `python-jose` is a safe, forward-looking choice.
- **Alternatives Considered**:
    - `PyJWT`: A popular and solid choice, but `python-jose` was selected for its comprehensive feature set.

## Decision: Dependency Management
- **Decision**: Use `uv` for package management.
- **Rationale**: `uv` is a modern, extremely fast drop-in replacement for `pip` and `pip-tools`. Its speed significantly improves the development workflow, especially in CI/CD environments.
- **Alternatives Considered**:
    - `pip` / `venv`: The standard Python toolchain. `uv` provides a superior developer experience with no compatibility trade-offs.
    - `Poetry`: A powerful tool for dependency management and packaging, but can be more complex to set up. `uv` provides the speed benefits without the added complexity for this project's scope.
