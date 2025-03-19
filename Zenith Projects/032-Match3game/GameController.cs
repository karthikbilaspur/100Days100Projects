using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class GameController : MonoBehaviour
{
  private int score = 0;
  private int highScore = 0;
  private int level = 1;

  public void MakeMove()
  {
    // Update score and high score
    score += 10;
    highScore = Mathf.Max(highScore, score);

    // Update level
    if (score >= level * 100)
    {
      level++;
    }
  }

  public int GetScore()
  {
    return score;
  }

  public int GetHighScore()
  {
    return highScore;
  }

  public int GetLevel()
  {
    return level;
  }
}