SIGNUP = {"name": "Yash B", "email": "yash@example.com", "password": "password123"}


async def test_signup_creates_user_and_sets_cookie(client):
    response = await client.post("/auth/signup", json=SIGNUP)
    assert response.status_code == 201
    assert response.cookies.get("if_session")
    body = response.json()
    assert body["email"] == "yash@example.com"
    assert body["name"] == "Yash B"
    assert "id" in body and "password" not in body and "password_hash" not in body


async def test_duplicate_email_conflicts(client):
    await client.post("/auth/signup", json=SIGNUP)
    response = await client.post("/auth/signup", json=SIGNUP)
    assert response.status_code == 409


async def test_signup_then_me_returns_current_user(client):
    await client.post("/auth/signup", json=SIGNUP)
    response = await client.get("/auth/me")
    assert response.status_code == 200
    assert response.json()["email"] == "yash@example.com"


async def test_login_wrong_password_is_unauthorized(client):
    await client.post("/auth/signup", json=SIGNUP)
    response = await client.post(
        "/auth/login", json={"email": SIGNUP["email"], "password": "wrong-password"}
    )
    assert response.status_code == 401


async def test_me_requires_authentication(client):
    response = await client.get("/auth/me")
    assert response.status_code == 401


async def test_logout_clears_session(client):
    await client.post("/auth/signup", json=SIGNUP)
    assert (await client.get("/auth/me")).status_code == 200
    logout = await client.post("/auth/logout")
    assert logout.status_code == 204
    assert (await client.get("/auth/me")).status_code == 401
