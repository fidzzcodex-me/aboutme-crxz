import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { profile } from "@/data/profile";
import { fetchGithubActivity } from "@/lib/github";
import Reveal from "@/components/Reveal";
import "./Activity.css";

export default async function Activity() {
  const activity = await fetchGithubActivity(profile.github.username);

  return (
    <section className="section activity-section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">activity</p>
          <h2 className="section-title">GitHub Activity</h2>
        </Reveal>

        {!activity ? (
          <Reveal delay={80}>
            <div className="activity-empty card">
              <FontAwesomeIcon icon={faGithub} className="activity-empty-icon" />
              <p>GitHub belum dihubungkan. Tambahkan username di data/profile.js.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={80}>
            <div className="activity-grid">
              <div className="activity-stat card">
                <span className="activity-stat-value mono">{activity.publicRepos}</span>
                <span className="activity-stat-label">public repos</span>
              </div>
              <div className="activity-stat card">
                <span className="activity-stat-value mono">{activity.followers}</span>
                <span className="activity-stat-label">followers</span>
              </div>
              <a href={activity.profileUrl} target="_blank" rel="noreferrer" className="activity-stat card activity-link">
                <FontAwesomeIcon icon={faGithub} />
                <span className="activity-stat-label">view profile</span>
              </a>
            </div>

            {activity.recentRepos.length > 0 && (
              <div className="activity-repos">
                {activity.recentRepos.map((repo) => (
                  <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className="repo-card card">
                    <p className="repo-name mono">{repo.name}</p>
                    <p className="repo-desc">{repo.description || "No description available yet."}</p>
                    {repo.language && <span className="repo-lang">{repo.language}</span>}
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
