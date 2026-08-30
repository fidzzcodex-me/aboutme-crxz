export async function fetchGithubActivity(username) {
  if (!username) return null;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const user = await res.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`,
      { next: { revalidate: 3600 } }
    );
    const repos = reposRes.ok ? await reposRes.json() : [];

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      profileUrl: user.html_url,
      recentRepos: repos.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
      })),
    };
  } catch {
    return null;
  }
}
