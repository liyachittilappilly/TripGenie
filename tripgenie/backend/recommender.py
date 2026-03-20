from packages import packages

def calculate_score(user, pkg):
    score = 0

    # Budget match
    if pkg["price"] <= user.get("budget", 999999):
        score += 0.4

    # Destination match
    if pkg["destination"] == user.get("destination"):
        score += 0.3

    # Type match
    if pkg["type"] == user.get("type"):
        score += 0.2

    # Duration match (loose)
    if abs(pkg["duration"] - user.get("duration", pkg["duration"])) <= 1:
        score += 0.1

    return score


def recommend(user):
    scored = []

    for pkg in packages:
        score = calculate_score(user, pkg)
        scored.append((pkg, score))

    scored.sort(key=lambda x: x[1], reverse=True)

    return [item[0] for item in scored[:3]]  # top 3