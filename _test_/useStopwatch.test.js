import { renderHook, act } from '@testing-library/react-hooks';
import useStopwatch from '../files/useStopwatch';
import renderer from "react-test-renderer";

jest.useFakeTimers();

describe('useTimer', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  //snapshot testing done

  describe("Jest Snapshot testing suite", () => {
    it("Matches DOM Snapshot", () => {
      const domTree = renderer.create(<useStopwatch />).toJSON();
      expect(domTree).toMatchSnapshot();
    });
  });

  //checking function test on start of stopwatch time
  it('it will start and pause the timer watch', () => {
    const startStopwatch = jest.fn();
    const { result } = renderHook(() => useStopwatch(10, startStopwatch));

    act(() => {
      result.current.startStopwatch();
    });

    expect(result.current.isRunning).toBe(true);
    act(() => {
        result.current.pauseStopwatch();
      });
  
      expect(result.current.isRunning).toBe(false);

});
//checking function test on reset of stopwatch time
it('it will reset the timer correctly', () => {
    const onTimerEnd = jest.fn();
    const { result } = renderHook(() => useStopwatch(10, onTimerEnd));

    act(() => {
      result.current.startStopwatch();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    act(() => {
      result.current.resetStopwatch();
    });

    expect(result.current.isRunning).toBe(false);
  });

  //checking function test on end of stopwatch time
  it('should call onTimerEnd when the timer ends', () => {
    const onTimerEnd = jest.fn();
    const { result } = renderHook(() => useStopwatch(1, onTimerEnd));

    act(() => {
      result.current.startStopwatch();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

  });

  //checking function test on lapse of stopwatch time
  it('should call laps when the timer ', () => {
    const onTimerEnd = jest.fn();
    const { result } = renderHook(() => useStopwatch(1, onTimerEnd));

    act(() => {
      result.current.lapStopwatch();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

  });

});