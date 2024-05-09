import { renderHook, act } from '@testing-library/react-hooks';
import useTimer from '../files/useTimer';
import renderer from "react-test-renderer";

jest.useFakeTimers();

describe('useTimer', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  //added snapshot test here
  describe("Jest Snapshot testing suite", () => {
    it("Matches DOM Snapshot", () => {
      const domTree = renderer.create(<useTimer />).toJSON();
      expect(domTree).toMatchSnapshot();
    });
  });
  it('should start and pause the timer correctly', () => {
    const onTimerEnd = jest.fn();
    const { result } = renderHook(() => useTimer(10, onTimerEnd));

    act(() => {
      result.current.startTimer();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.timeRemaining).toBe('00:05:00');

    act(() => {
      result.current.pauseTimer();
    });

    expect(result.current.isRunning).toBe(false);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.timeRemaining).toBe('00:05:00');
  });

  it('should reset the timer correctly', () => {
    const onTimerEnd = jest.fn();
    const { result } = renderHook(() => useTimer(10, onTimerEnd));

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.timeRemaining).toBe('00:05:00');

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.timeRemaining).toBe('00:10:00');
    expect(result.current.isRunning).toBe(false);
  });

  it('should call onTimerEnd when the timer ends', () => {
    const onTimerEnd = jest.fn();
    const { result } = renderHook(() => useTimer(1, onTimerEnd));

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onTimerEnd).toHaveBeenCalled();
    expect(result.current.timeRemaining).toBe('00:00:00');
    expect(result.current.isRunning).toBe(false);
  });
});

//Feedback to improve stability or strategy of test case writing:-

// Test the initial coverage with the Parent file/function.
// Start from the lower most file in the hierarchy. ...
// Write test cases even for the constants declared. ...
// Prefer Mocking Packages instead of a file.
// Use Snapshot testing 